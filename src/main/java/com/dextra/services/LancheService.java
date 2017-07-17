package com.dextra.services;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.dextra.dao.DaoLanche;
import com.dextra.model.Lanche;

/**
 * Serviços de Lanches
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */

@Path("/lanches")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LancheService {
		
	private DaoLanche dao = new DaoLanche();
	
	/**
	 * Retornar todos os lanches
	 * @author Thiago Hernandes de Souza
	 * @since 17-06-2017
	 * @return lanches
	 * */
	@GET
	@Path("/todas")	
	public List<Lanche> todas() {		
		return dao.todos();
	}
}
