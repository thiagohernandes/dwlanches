package com.dextra.dao;

import java.util.ArrayList;
import java.util.List;

import com.dextra.database.DatabaseInMemory;
import com.dextra.model.Cliente;
import com.dextra.util.Util;

/**
 * DAO Cliente
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
public class DaoCliente {
	
	List<Cliente> clientes = DatabaseInMemory.getDbclientes();
	Util util = new Util();
	
	public DaoCliente(){
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
