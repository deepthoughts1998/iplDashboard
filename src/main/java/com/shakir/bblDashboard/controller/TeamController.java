package com.shakir.bblDashboard.controller;

import com.shakir.bblDashboard.model.Match;
import com.shakir.bblDashboard.model.Teams;
import com.shakir.bblDashboard.repository.MatchRepository;
import com.shakir.bblDashboard.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private MatchRepository matchRepository;

    @GetMapping("/teams")
    public Iterable<Teams> getAllTeams(){
        return teamRepository.findAll();
    }

    @GetMapping("/teams/{teamName}")
    public Teams getTeam(@PathVariable String teamName){
        List<Match> matches=matchRepository.findLatestMatches(teamName,4);
        Teams team= teamRepository.findByTeamName(teamName);
        team.setMatches(matches);
        return team;
    }

    @GetMapping("/teams/{teamName}/matches")
    public List<Match> getMatches(@PathVariable String teamName, @RequestParam int year){
        LocalDate startDate=LocalDate.of(year,1,1);
        LocalDate endDate= LocalDate.of(year+1,1,1);
        return matchRepository.findLatestMatchesByYear(teamName,startDate,endDate);
    }
}
