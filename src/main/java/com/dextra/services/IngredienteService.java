package com.dextra.services;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.dextra.dao.DaoIngrediente;
import com.dextra.model.Ingrediente;

/**
 * Serviço/Resource de Ingredientes
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */

@Path("/ingredientes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class IngredienteService {
		
	private DaoIngrediente dao = new DaoIngrediente();
	
	/**
	 * Retornar todos os ingredientes
	 * @author Thiago Hernandes de Souza
	 * @since 17-06-2017
	 * @return lista de ingredientes
	 * */
	@GET
	@Path("/todos")	
	public List<Ingrediente> todos() {		
		return dao.todos();
	}
	
}
