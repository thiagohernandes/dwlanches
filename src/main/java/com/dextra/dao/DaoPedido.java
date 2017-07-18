package com.dextra.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.dextra.model.Cliente;
import com.dextra.model.Ingrediente;
import com.dextra.model.Lanche;
import com.dextra.model.Pedido;
import com.dextra.util.Util;

/**
 * DAO Pedido
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
public class DaoPedido {
	
	private List<Pedido> pedidos = new ArrayList<>();
	private Util util = new Util();
	private DaoLanche daoLanche = new DaoLanche();
	private DaoCliente daoCliente = new DaoCliente();
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
		// caso de lanche personalizado
		List<Ingrediente> ingredientesPersonalizados = new ArrayList<>();
		
		// cliente
		Object  objCliente = pedido.get("cliente");	
		String[] valoresCliente = util.formataValoresObjeto(objCliente);
		Cliente cliente = daoCliente.clienteId(Integer.parseInt(valoresCliente[0]));
			
		// lanches
		List<Object> objLanche = (List<Object>) pedido.get("lanches"); 
		List<Lanche> lanchesPedido = new ArrayList<>(); 
		for(int z = 0; z < objLanche.size(); z++) {			
			Object oLanche = objLanche.get(z);		
			String[] vLanche = util.formataValoresObjeto(oLanche);
			int auxCodigoLanche = Integer.parseInt(vLanche[0]);			
			if(auxCodigoLanche < 5) {
				lanchesPedido.add(daoLanche.lancheId(auxCodigoLanche));
			} else {
				// ingredientes personalizados 
					List<Object> objIngrPersonalizado = Arrays.asList(vLanche);
					for(int w = 1; w < objIngrPersonalizado.size(); w++) {			
						Object oIngrPersonalizado = objIngrPersonalizado.get(w);		
						String[] vIngrPersonalizado = util.formataValoresObjeto(oIngrPersonalizado);
						Ingrediente ingrediente = daoLanche.ingredienteId(Integer.parseInt(vIngrPersonalizado[0]));
						ingredientesPersonalizados.add(ingrediente);
					}
				lanchesPedido.add(daoLanche.lancheId(auxCodigoLanche,ingredientesPersonalizados));
			}
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
	
	/**
	 * Método de cancelamento/exclusão de um pedido
	 * @author Thiago Hernandes de Souza
	 * @since 18-07-2017
	 * */
	public void excluir(int id){
		for(int i = 0; i < pedidos.size(); i++){
			if(pedidos.get(i).getId() == id){
				pedidos.remove(i);
				break;
			}
		}
	}

}