package com.shakir.bblDashboard.data;

import com.shakir.bblDashboard.model.Match;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ItemProcessor;

import java.time.LocalDate;

public class MatchInputProcessor implements ItemProcessor<MatchInput, Match> {

        private static final Logger log = LoggerFactory.getLogger(MatchInputProcessor.class);

        @Override
        public Match process(final MatchInput matchInput) throws Exception {
            Match match=new Match();
            match.setId(Long.parseLong(matchInput.getId()));
            match.setCity(matchInput.getCity());
            match.setDate(LocalDate.parse(matchInput.getDate()));
            match.setVenue(matchInput.getVenue());

            if(matchInput.getToss_winner()==matchInput.getTeam1()){
                if(matchInput.getToss_decision()=="bat"){
                    match.setTeam1(matchInput.getTeam1());
                    match.setTeam2(matchInput.getTeam2());
                }else{
                    match.setTeam1(matchInput.getTeam2());
                    match.setTeam2(matchInput.getTeam1());
                }
            }else{
                if(matchInput.getToss_decision()=="bat"){
                    match.setTeam1(matchInput.getTeam2());
                    match.setTeam2(matchInput.getTeam1());
                }else{
                    match.setTeam1(matchInput.getTeam1());
                    match.setTeam2(matchInput.getTeam2());
                }
            }

            match.setTossWinner(matchInput.getToss_winner());
            match.setTossDecision(matchInput.getToss_decision());
            match.setWinner(matchInput.getWinner());
            match.setResult(matchInput.getResult());
            match.setResultMargin(matchInput.getResult_margin());
            match.setEliminator(matchInput.getEliminator());
            match.setUmpire1(matchInput.getUmpire1());
            match.setUmpire2(matchInput.getUmpire2());

            return match;

        }

}

