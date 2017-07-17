package com.dextra.services;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.dextra.dao.DaoPromocao;
import com.dextra.model.Promocao;

/**
 * Serviços de Promoções
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */

@Path("/promocoes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PromocaoService {
		
	private DaoPromocao dao = new DaoPromocao();
	
	/**
	 * Retornar todas as promoções
	 * @author Thiago Hernandes de Souza
	 * @since 17-06-2017
	 * @return promoções
	 * */
	@GET
	@Path("/todas")	
	public List<Promocao> todas() {		
		return dao.todas();
	}

}