package com.shakir.bblDashboard.data;



import com.shakir.bblDashboard.model.Teams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@Component
public class JobCompletionNotificationListener implements JobExecutionListener {

        private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

        private EntityManager entityManager;

        @Autowired
        public JobCompletionNotificationListener(EntityManager entityManager) {
            this.entityManager=entityManager;;
        }

    @Override
    public void beforeJob(JobExecution jobExecution) {

    }

    @Override
    @Transactional
        public void afterJob(JobExecution jobExecution) {
            if(jobExecution.getStatus() == BatchStatus.COMPLETED) {
                log.info("!!! JOB FINISHED! Time to verify the results");

                Map<String,Teams> teams=new HashMap<>();
                entityManager.createQuery("select m.team1,count(*) from Match m group by m.team1",Object[].class)
                        .getResultList()
                        .stream()
                        .map(e->new Teams((String)e[0],(long)e[1]))
                        .forEach(team->teams.put(team.getTeamName(),team));

                entityManager.createQuery("select m.team2,count(*) from Match m group by m.team2",Object[].class)
                        .getResultList()
                        .stream()
                        .forEach(e->{
                            Teams team=teams.get((String) e[0]);
                            team.setTotalMatches(team.getTotalMatches()+(long)e[1]);
                        });

                entityManager.createQuery("select m.winner,count(*) from Match m group by m.winner",Object[].class)
                        .getResultList()
                        .stream()
                        .forEach(e->{
                            Teams team=teams.get((String) e[0]);
                            if(team!=null)team.setTotalNoWins((long) e[1]);
                        });

                teams.values().forEach(team->entityManager.persist(team));
                teams.values().forEach(team->System.out.println(team));
            }
        }
    }

