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
public class DaoLanche {
	
	List<Ingrediente> ingredientesLanche = new ArrayList<>();
	List<Lanche> lanches = new ArrayList<>();
	
	public DaoLanche(){
		// Inserção de lanches pré-definidos
		ingredientesLanche.add(new Ingrediente(2,"Bacon",2.00));
		ingredientesLanche.add(new Ingrediente(3,"Hanbúrguer de carne",3.00));
		ingredientesLanche.add(new Ingrediente(5,"Queijo",1.50));
		lanches.add(new Lanche(1,"X-Bacon",ingredientesLanche));
			
		ingredientesLanche.clear();			
		ingredientesLanche.add(new Ingrediente(3,"Hanbúrguer de carne",3.00));
		ingredientesLanche.add(new Ingrediente(5,"Queijo",1.50));
		lanches.add(new Lanche(2,"X-Burger",ingredientesLanche));
			
		ingredientesLanche.clear();			
		ingredientesLanche.add(new Ingrediente(5,"Ovo",0.80));
		ingredientesLanche.add(new Ingrediente(3,"Hanbúrguer de carne",3.00));
		ingredientesLanche.add(new Ingrediente(5,"Queijo",1.50));
		lanches.add(new Lanche(3,"X-Egg",ingredientesLanche));
				
		ingredientesLanche.clear();			
		ingredientesLanche.add(new Ingrediente(5,"Ovo",0.80));
		ingredientesLanche.add(new Ingrediente(5,"Queijo",1.50));
		ingredientesLanche.add(new Ingrediente(3,"Hanbúrguer de carne",3.00));
		ingredientesLanche.add(new Ingrediente(5,"Queijo",1.50));
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

}
