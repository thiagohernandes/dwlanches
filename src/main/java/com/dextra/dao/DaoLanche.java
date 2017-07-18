package com.dextra.dao;

import java.util.ArrayList;
import java.util.List;

import com.dextra.database.DatabaseInMemory;
import com.dextra.model.Ingrediente;
import com.dextra.model.Lanche;

/**
 * DAO Lanche
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
public class DaoLanche {
	
	public List<Lanche> lanches = DatabaseInMemory.getDblanches();
	private List<Ingrediente> ingredientesLanche = new ArrayList<>();
	private DaoIngrediente daoIngrediente = new DaoIngrediente();
	
	public DaoLanche(){
		// Inserção de lanches pré-definidos
				ingredientesLanche.add(daoIngrediente.ingredienteId(2));
				ingredientesLanche.add(daoIngrediente.ingredienteId(3));
				ingredientesLanche.add(daoIngrediente.ingredienteId(5));
				lanches.add(new Lanche(1,"X-Bacon",ingredientesLanche));
							
				ingredientesLanche.clear();	
				ingredientesLanche.add(daoIngrediente.ingredienteId(3));
				ingredientesLanche.add(daoIngrediente.ingredienteId(5));
				lanches.add(new Lanche(2,"X-Burger",ingredientesLanche));
					
				ingredientesLanche.clear();			
				ingredientesLanche.add(daoIngrediente.ingredienteId(3));
				ingredientesLanche.add(daoIngrediente.ingredienteId(4));
				ingredientesLanche.add(daoIngrediente.ingredienteId(5));
				lanches.add(new Lanche(3,"X-Egg",ingredientesLanche));
								
				ingredientesLanche.clear();	
				ingredientesLanche.add(daoIngrediente.ingredienteId(2));
				ingredientesLanche.add(daoIngrediente.ingredienteId(3));
				ingredientesLanche.add(daoIngrediente.ingredienteId(4));
				ingredientesLanche.add(daoIngrediente.ingredienteId(5));
				lanches.add(new Lanche(4,"X-Egg Bacon",ingredientesLanche));
	}
	
	/**
	 * Método de retorno de todos os lanches
	 * @author Thiago Hernandes de Souza
	 * @since 17-07-2017
	 * */
	public List<Lanche> todos(){
		return lanches;
	}
	
	/**
	 * Método de retorno de um lanche específico
	 * @author Thiago Hernandes de Souza
	 * @since 18-07-2017
	 * */
	public Lanche lancheId(int id){
		Lanche retorno = new Lanche();
		for(int i = 0; i < lanches.size(); i++){
			if(lanches.get(i).getId() == id){
				retorno = lanches.get(i); 
				break;
			}
		}
		return retorno;
	}

}
