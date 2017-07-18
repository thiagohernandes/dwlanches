package com.dextra.database;

import java.util.ArrayList;
import java.util.List;

import com.dextra.dao.DaoIngrediente;
import com.dextra.model.Cliente;
import com.dextra.model.Ingrediente;
import com.dextra.model.Lanche;
import com.dextra.model.Pedido;
import com.dextra.model.Promocao;

public class DatabaseInMemory {
	
	private static List<Promocao> dbPromocoes = new ArrayList<>();
	private static List<Cliente> dbClientes = new ArrayList<>();
	private static List<Lanche> dbLanches = new ArrayList<>();
	private static List<Ingrediente> dbIngredientes = new ArrayList<>();
	private static List<Pedido> dbPedidos = new ArrayList<>();
	
	
	
	public DatabaseInMemory(){
		// Promoções pré-definidas (sem lanches adicionados)
		dbPromocoes.add(new Promocao(1,"Light"));
		dbPromocoes.add(new Promocao(2,"Muita carne"));
		dbPromocoes.add(new Promocao(3,"Muito queijo"));
		dbPromocoes.add(new Promocao(4,"Inflação"));
		// Inserção de alguns clientes
		dbClientes.add(new Cliente(1,"Fulano da Silva")); 
		dbClientes.add(new Cliente(2,"Beltrano dos Santos"));
		dbClientes.add(new Cliente(3,"Delana Dantas"));
		
		
	}

	public static List<Promocao> getDbpromocoes() {
		return dbPromocoes;
	}

	public static List<Cliente> getDbclientes() {
		return dbClientes;
	}

	public static List<Lanche> getDblanches() {
		return dbLanches;
	}

	public static List<Ingrediente> getDbingredientes() {
		return dbIngredientes;
	}
	
	public static List<Pedido> getDbpedidos() {
		return dbPedidos;
	}

}
