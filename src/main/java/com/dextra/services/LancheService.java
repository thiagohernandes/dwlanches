package com.dextra.services;

import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.dextra.dao.DaoLanche;
import com.dextra.model.Lanche;

/**
 * Serviço/Resource de Lanches
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
	@Path("/todos")	
	public List<Lanche> todos() {		
		return dao.todosLanches();
	}
	
	/**
	 * Criar um novo lanche
	 * @author Thiago Hernandes de Souza
	 * @since 20-06-2017
	 * */
	@POST
	@Path("/novo")	
	public void novo(Map<String,Object> lanche) {		
		dao.novo(lanche);
	}
}
