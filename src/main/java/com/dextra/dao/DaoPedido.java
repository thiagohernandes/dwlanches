package com.dextra.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.dextra.database.DatabaseInMemory;
import com.dextra.model.Cliente;
import com.dextra.model.Lanche;
import com.dextra.model.Pedido;
import com.dextra.util.Util;

/**
 * DAO Pedido
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
public class DaoPedido {
	
	List<Pedido> pedidos = DatabaseInMemory.getDbpedidos();
	Util util = new Util();
	DaoLanche daoLanche = new DaoLanche();
	
	/**
	 * Método de retorno de todos os pedidos
	 * @author Thiago Hernandes de Souza
	 * @since 17-07-2017
	 * */
	public List<Pedido> todos(){
		return pedidos;
	}
	
	/**
	 * Método de inserção de um pedido
	 * @author Thiago Hernandes de Souza
	 * @since 17-07-2017
	 * */
	public void inserir(Map<String,Object> pedido){
		// cliente
		Object  objCliente = pedido.get("cliente");	
		String[] valoresCliente = util.formataValoresObjeto(objCliente);
		Cliente cliente = new Cliente(Integer.parseInt(valoresCliente[0]),valoresCliente[1]);
		
		// lanches
		List<Object> objLanche = (List<Object>) pedido.get("lanches"); 
		List<Lanche> lanchesPedido = new ArrayList<>(); 
		for(int z = 0; z < objLanche.size(); z++) {			
			Object oLanche = objLanche.get(z);		
			String[] vLanche = util.formataValoresObjeto(oLanche);				
			lanchesPedido.add(daoLanche.lancheId(Integer.parseInt(vLanche[0])));
		}
		
		// pedido
		Object objPedido = pedido.get("pedido");			
		String[] valoresPedido = util.formataValoresObjeto(objPedido);				
		Pedido novoPedido = new Pedido(pedidos.size()+1,
					   util.formataStringToDate(valoresPedido[0]),
					   cliente,
					   lanchesPedido,
					   Double.parseDouble(valoresPedido[1]));
		pedidos.add(novoPedido);
	}

}