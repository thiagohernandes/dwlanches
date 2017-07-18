package com.dextra.dao;

import java.util.ArrayList;
import java.util.List;

import com.dextra.model.Cliente;
import com.dextra.util.Util;

/**
 * DAO Cliente
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
public class DaoCliente {
	
	private List<Cliente> clientes = new ArrayList<>();
	private Util util = new Util();
	
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
	

}
