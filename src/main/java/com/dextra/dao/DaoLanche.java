package com.dextra.dao;

import java.util.ArrayList;
import java.util.List;

import com.dextra.model.Ingrediente;
import com.dextra.model.Lanche;

/**
 * DAO Lanche
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
public class DaoLanche extends DaoIngrediente {
	
	private List<Lanche> lanches = new ArrayList<>();
	
	public DaoLanche(){
		// Inserção de lanches pré-definidos
		lanches.add(new Lanche(1,"X-Bacon"));
		lanches.add(new Lanche(2,"X-Burger"));
		lanches.add(new Lanche(3,"X-Egg"));
		lanches.add(new Lanche(4,"X-Egg Bacon"));
	}
	
	/**
	 * Método de retorno de todos os lanches
	 * @author Thiago Hernandes de Souza
	 * @since 17-07-2017
	 * */
	public List<Lanche> todosLanches(){
		return lanches;
	}
	
	/**
	 * Método de retorno de um lanche específico com os respectivos ingredientes
	 * @author Thiago Hernandes de Souza
	 * @since 18-07-2017
	 * */
	public Lanche lancheId(int id){
		Lanche retorno = new Lanche();
		List<Ingrediente> ingredientesLanche = new ArrayList<>();
		for(int i = 0; i < lanches.size(); i++){
			if(lanches.get(i).getId() == id){
				retorno = lanches.get(i); 
				break;
			}
		}
		// ingredientes
		switch(id){
			case 1: // X-Bacon R$ 6.5
				ingredientesLanche.add(ingredienteId(2));
				ingredientesLanche.add(ingredienteId(3));
				ingredientesLanche.add(ingredienteId(5));
				break;
			case 2: // X-Burger R$ 4.5
				ingredientesLanche.add(ingredienteId(3));
				ingredientesLanche.add(ingredienteId(5));
				break;
			case 3: // X-Egg R$ 5.3
				ingredientesLanche.add(ingredienteId(3));
				ingredientesLanche.add(ingredienteId(4));
				ingredientesLanche.add(ingredienteId(5));
				break;
			case 4: // X-Egg Bacon R$ 7.3
				ingredientesLanche.add(ingredienteId(2));
				ingredientesLanche.add(ingredienteId(3));
				ingredientesLanche.add(ingredienteId(4));
				ingredientesLanche.add(ingredienteId(5));
				break;
		}
		retorno.setIngredientes(ingredientesLanche);
		return retorno;
	}
	
	/**
	 * Método de retorno de um lanche personalizado com os respectivos ingredientes
	 * @author Thiago Hernandes de Souza
	 * @since 18-07-2017
	 * */
	public Lanche lancheId(int id,List<Ingrediente> ingredientes){
		Lanche retorno = new Lanche();
		List<Ingrediente> ingredientesLanche = new ArrayList<>();
		for(int i = 0; i < lanches.size(); i++){
			if(lanches.get(i).getId() == id){
				retorno = lanches.get(i); 
				break;
			}
		}
		for(int i = 0; i < ingredientes.size(); i++){
			ingredientesLanche.add(ingredienteId(ingredientes.get(i).getId()));
		}
		retorno.setIngredientes(ingredientesLanche);
		return retorno;
	}

}
