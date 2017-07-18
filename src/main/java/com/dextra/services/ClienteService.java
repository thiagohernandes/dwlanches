package com.dextra.services;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.dextra.dao.DaoCliente;
import com.dextra.model.Cliente;

/**
 * Serviço/Resource de Clientes
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */

@Path("/clientes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ClienteService {
		
	private DaoCliente dao = new DaoCliente();
	
	/**
	 * Retornar todos os clientes
	 * @author Thiago Hernandes de Souza
	 * @since 17-06-2017
	 * @return lista de clientes
	 * */
	@GET
	@Path("/todos")	
	public List<Cliente> todos() {		
		return dao.todos();
	}
	
}
