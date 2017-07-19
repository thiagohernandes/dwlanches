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
	 * @param dados do pedido e flag (1 = inserção e 2 = alteração)
	 * */
	public void gravar(Map<String,Object> pedido, int flag){
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
		
		// inserção
		if(flag == 1) {
		Pedido novoPedido = new Pedido(pedidos.size()+1,
					   util.formataStringToDate(valoresPedido[0]),
					   cliente,
					   lanchesPedido,
					   Double.parseDouble(valoresPedido[1]));
		pedidos.add(novoPedido);
		// alteração
		} else {
			int numeroPedido = Integer.parseInt(valoresPedido[2]); 
			excluir(numeroPedido);
			Pedido novoPedido = new Pedido(numeroPedido,
					   util.formataStringToDate(valoresPedido[0]),
					   cliente,
					   lanchesPedido,
					   Double.parseDouble(valoresPedido[1]));
			pedidos.add(novoPedido);
		}
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
	
	/**
	 * Método de carregamento de um pedido
	 * @author Thiago Hernandes de Souza
	 * @since 18-07-2017
	 * */
	public Pedido carregar(int id){
		Pedido retorno = new Pedido();
		for(int i = 0; i < pedidos.size(); i++){
			if(pedidos.get(i).getId() == id){
				retorno = pedidos.get(i);
				break;
			}
		}
		return retorno;
	}
	
	/**
	 * Método de pesquisa de pedidos
	 * @author Thiago Hernandes de Souza
	 * @since 18-07-2017
	 * */
	public List<Pedido> pesquisar(Map<String,String> parametros){
		List<Pedido> pesquisa = new ArrayList();
		// retornar todos
		if(parametros.get("numeropedido") == null && parametros.get("datapedido") == null &&
				parametros.get("clienteid") == null && parametros.get("lancheid") == null
				){
			pesquisa = pedidos;
		} else {
		// enviou o número do pedido
		if(parametros.get("numeropedido") != null){
			for(int i = 0; i < pedidos.size(); i++){
				if(pedidos.get(i).getId() == Integer.parseInt(parametros.get("numeropedido").toString())){
					pesquisa.add(pedidos.get(i));
					break;
				}
			}
		} else {
			// enviou a data do pedido
			if(parametros.get("datapedido") != null){
				for(int i = 0; i < pedidos.size(); i++){
					if(pedidos.get(i).getData().equals(util.formataStringToDate(parametros.get("datapedido").toString()))){
						if(verificarObjeto(pedidos.get(i),pesquisa) == false){
							pesquisa.add(pedidos.get(i)); 	
						}						
					}
				}
			}
			// enviou o cliente do pedido
			if(parametros.get("clienteid") != null){
				for(int i = 0; i < pedidos.size(); i++){
					if(pedidos.get(i).getCliente().getId() == Integer.parseInt(parametros.get("clienteid").toString())){
						if(verificarObjeto(pedidos.get(i),pesquisa) == false){
							pesquisa.add(pedidos.get(i)); 	
						} 
					}
				}
			}
			// enviou o lanche do pedido
			if(parametros.get("lancheid") != null){
				for(int i = 0; i < pedidos.size(); i++){
					for(int l = 0; l < pedidos.get(i).getLanches().size(); l++){
						if(pedidos.get(i).getLanches().get(l).getId() == 
								Integer.parseInt(parametros.get("lancheid").toString())){
							if(verificarObjeto(pedidos.get(i),pesquisa) == false){
								pesquisa.add(pedidos.get(i)); 	
							} 
						}
					}
				}
			}
		}
		}
		return pesquisa;
	}
	
	/**
	 * Método de verificação de objeto inserido
	 * @author Thiago Hernandes de Souza
	 * @since 19-07-2017
	 * */
	private boolean verificarObjeto(Pedido pedido,List<Pedido> lista){
		boolean r = false;
		for(int x = 0; x < lista.size(); x++){
			if(lista.get(x).getId() == pedido.getId()){
				r = true;
				break;
			}
		}
		return r;
	}

}