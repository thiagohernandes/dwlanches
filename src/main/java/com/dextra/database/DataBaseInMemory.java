package com.dextra.database;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.SessionScoped;

import com.dextra.model.Ingrediente;
import com.dextra.model.Lanche;
import com.dextra.model.Promocao;

/**
 * Banco de Dados inMemory
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */

@SessionScoped
public class DataBaseInMemory implements Serializable{
	
	private static final long serialVersionUID = 3347559732004262004L;
	
		// Métodos estáticos para armazenar valores
		private static List<Promocao> dtPromocoes = new ArrayList<>();
		private static List<Ingrediente> dtIngredientes = new ArrayList<>();
		private static List<Lanche> dtLanches = new ArrayList<>();
		
		public DataBaseInMemory(){
			// Inserção de itens iniciais de ingredientes
			dtIngredientes.add(new Ingrediente(1,"Alface",0.40)); 
			dtIngredientes.add(new Ingrediente(2,"Bacon",2.00));
			dtIngredientes.add(new Ingrediente(3,"Hanbúrguer de carne",3.00));
			dtIngredientes.add(new Ingrediente(4,"Ovo",0.80));
			dtIngredientes.add(new Ingrediente(5,"Queijo",1.50));

			// Inserção de lanches pré-definidos
			List<Ingrediente> ingredientesLanche = new ArrayList<>();			
			ingredientesLanche.add(new Ingrediente(2,"Bacon",2.00));
			ingredientesLanche.add(new Ingrediente(3,"Hanbúrguer de carne",3.00));
			ingredientesLanche.add(new Ingrediente(5,"Queijo",1.50));
			dtLanches.add(new Lanche(1,"X-Bacon",ingredientesLanche));
			
			ingredientesLanche.clear();			
			ingredientesLanche.add(new Ingrediente(3,"Hanbúrguer de carne",3.00));
			ingredientesLanche.add(new Ingrediente(5,"Queijo",1.50));
			dtLanches.add(new Lanche(2,"X-Burger",ingredientesLanche));
			
			ingredientesLanche.clear();			
			ingredientesLanche.add(new Ingrediente(5,"Ovo",0.80));
			ingredientesLanche.add(new Ingrediente(3,"Hanbúrguer de carne",3.00));
			ingredientesLanche.add(new Ingrediente(5,"Queijo",1.50));
			dtLanches.add(new Lanche(3,"X-Egg",ingredientesLanche));
			
			ingredientesLanche.clear();			
			ingredientesLanche.add(new Ingrediente(5,"Ovo",0.80));
			ingredientesLanche.add(new Ingrediente(5,"Queijo",1.50));
			ingredientesLanche.add(new Ingrediente(3,"Hanbúrguer de carne",3.00));
			ingredientesLanche.add(new Ingrediente(5,"Queijo",1.50));
			dtLanches.add(new Lanche(4,"X-Egg Bacon",ingredientesLanche));
			
			// Promoções pré-definidas (sem lanches adicionados)
			dtPromocoes.add(new Promocao(1,"Light"));
			dtPromocoes.add(new Promocao(2,"Muita carne"));
			dtPromocoes.add(new Promocao(3,"Muito queijo"));
			dtPromocoes.add(new Promocao(4,"Inflação"));
		}
		
		public static List<Promocao> getDtPromocoes() {
			return dtPromocoes;
		}
		public static void setDtPromocao(List<Promocao> dtPromocoes) {
			DataBaseInMemory.dtPromocoes = dtPromocoes;
		}
		public static List<Ingrediente> getDtIngredientes() {
			return dtIngredientes;
		}
		public static void setDtIngrediente(List<Ingrediente> dtIngredientes) {
			DataBaseInMemory.dtIngredientes = dtIngredientes;
		}
		public static List<Lanche> getDtLanches() {
			return dtLanches;
		}
		public static void setDtLanches(List<Lanche> dtLanches) {
			DataBaseInMemory.dtLanches = dtLanches;
		}

}
