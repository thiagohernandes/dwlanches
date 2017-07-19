package com.dextra.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.dextra.dao.DaoPedido;
import com.dextra.model.Lanche;
import com.dextra.model.Pedido;

/**
 * Serviço/Resource de Pedidos
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */

@Path("/pedidos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PedidoService {
		
	private DaoPedido dao = new DaoPedido();
	
	/**
	 * Retornar todos os pedidos
	 * @author Thiago Hernandes de Souza
	 * @since 17-07-2017
	 * @return lista de pedidos
	 * */
	@GET
	@Path("/todos")	
	public List<Pedido> todos() {		
		return dao.todos();
	}
	
	/**
	 * Retornar todos lanches de um pedido
	 * @author Thiago Hernandes de Souza
	 * @since 19-07-2017
	 * @return lista de lanches
	 * */
	@GET
	@Path("/lanches/{id}")
	public List<Lanche> lanchesPedido(@PathParam("id") int id){		
		return dao.lanchesPedido(id);
	}
	
	/**
	 * Inserir um pedido
	 * @author Thiago Hernandes de Souza
	 * @since 18-07-2017
	 * */
	@POST
	@Path("/inserir")
	public void inserir(Map<String,Object> pedido){
		dao.gravar(pedido,1);
	}
	
	/**
	 * Alterar um pedido
	 * @author Thiago Hernandes de Souza
	 * @since 18-07-2017
	 * */
	@PUT
	@Path("/alterar")
	public void alterar(Map<String,Object> pedido){
		dao.gravar(pedido,2);
	}
	
	/**
	 * Excluir um pedido
	 * @author Thiago Hernandes de Souza
	 * @since 18-07-2017
	 * */
	@DELETE
	@Path("/excluir/{id}")
	public void excluir(@PathParam("id") int id){
		dao.excluir(id);
	}
	
	/**
	 * Carregar um pedido
	 * @author Thiago Hernandes de Souza
	 * @since 19-07-2017
	 * */
	@GET
	@Path("/id/{id}")
	public Pedido carregar(@PathParam("id") int id){
		return dao.carregar(id);
	}
	
	/**
	 * Pesquisa genérica
	 * @author Thiago Hernandes de souza
	 * @since 18-07-2017
	 * @param clienteid, numeropedido, datapedido, lancheid
	 * @return List<Map>
	 * */
	@GET
	@Path("/pesquisar")		
	public List<Pedido> pesquisar(@QueryParam("clienteid") String clienteId,
							      @QueryParam("numeropedido") String numeroPedido,
							      @QueryParam("datapedido") String datapedido,
							      @QueryParam("lancheid") String lancheid){
		Map<String,String> parametros = new HashMap<>();
		parametros.put("clienteid", clienteId);
		parametros.put("numeropedido", numeroPedido);
		parametros.put("datapedido", datapedido);
		parametros.put("lancheid", lancheid);
		return dao.pesquisar(parametros);			
	}
	
}