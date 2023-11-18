package com.shakir.bblDashboard.repository;

import com.shakir.bblDashboard.model.Teams;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Teams,Long> {

    public Teams findByTeamName(String team_name);

}
