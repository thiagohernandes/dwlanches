package com.dextra.services;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Resource/Serviços de Ingredientes
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */

@Path("/ingredientes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class IngredienteService {
	
	/**
	 * Retornar todos os clientes
	 * @author Thiago Hernandes de Souza
	 * @since 01-06-2017
	 * @return lista de clientes
	 * */
	@GET
	@Path("/teste")	
	public String todosClientes() {		
		return "teste";
	}

}
