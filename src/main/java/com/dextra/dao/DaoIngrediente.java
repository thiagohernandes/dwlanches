package com.dextra.dao;

import java.util.ArrayList;
import java.util.List;

import com.dextra.model.Ingrediente;
import com.dextra.util.Util;

/**
 * DAO Ingrediente
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
public class DaoIngrediente {
	
	List<Ingrediente> ingredientes = new ArrayList<>();
	Util util = new Util();
	
	public DaoIngrediente(){
		// Inserção de itens iniciais de ingredientes
		ingredientes.add(new Ingrediente(1,"Alface",0.40)); 
		ingredientes.add(new Ingrediente(2,"Bacon",2.00));
		ingredientes.add(new Ingrediente(3,"Hambúrguer de carne",3.00));
		ingredientes.add(new Ingrediente(4,"Ovo",0.80));
		ingredientes.add(new Ingrediente(5,"Queijo",1.50));
	}
	
	/**
	 * Método de retorno de todos os ingredientes
	 * @author Thiago Hernandes de Souza
	 * @since 17-07-2017
	 * */
	public List<Ingrediente> todos(){
		return ingredientes;
	}
	

}
