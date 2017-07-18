package com.dextra.dao;

import java.util.ArrayList;
import java.util.List;

import com.dextra.model.Cliente;
import com.dextra.model.Ingrediente;

/**
 * DAO Cliente
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
public class DaoCliente {
	
	private List<Cliente> clientes = new ArrayList<>();
	
	public DaoCliente(){
		// Inserção de alguns clientes
		clientes.add(new Cliente(1,"Fulano da Silva")); 
		clientes.add(new Cliente(2,"Beltrano dos Santos"));
		clientes.add(new Cliente(3,"Delana Dantas"));
	}
	
	/**
	 * Método de retorno de todos os clientes
	 * @author Thiago Hernandes de Souza
	 * @since 17-07-2017
	 * */
	public List<Cliente> todos(){
		return clientes;
	}
	
	/**
	 * Método de retorno de um cliente específico
	 * @author Thiago Hernandes de Souza
	 * @since 18-07-2017
	 * */
	public Cliente clienteId(int id){
		Cliente retorno = new Cliente();
		for(int i = 0; i < clientes.size(); i++){
			if(clientes.get(i).getId() == id){
				retorno = clientes.get(i); 
				break;
			}
		}
		return retorno;
	}

}
