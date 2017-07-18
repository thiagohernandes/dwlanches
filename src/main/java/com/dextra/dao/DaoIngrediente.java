package com.dextra.dao;

import java.util.ArrayList;
import java.util.List;

import com.dextra.database.DatabaseInMemory;
import com.dextra.model.Ingrediente;
import com.dextra.model.Lanche;
import com.dextra.util.Util;

/**
 * DAO Ingrediente
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
public class DaoIngrediente {
	
	List<Ingrediente> ingredientes = DatabaseInMemory.getDbingredientes();
	Util util = new Util();
	
	public DaoIngrediente(){
		// Inserção de ingredientes básicos
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
	
	/**
	 * Método de retorno de um ingrediente por id
	 * @author Thiago Hernandes de Souza
	 * @since 18-07-2017
	 * */
	public Ingrediente ingredienteId(int id){
		Ingrediente retorno = new Ingrediente();
		for(int i = 0; i < ingredientes.size(); i++){
			if(ingredientes.get(i).getId() == id){
				retorno = ingredientes.get(i); 
				break;
			}
		}
		return retorno;
	}

}
