package com.dextra.dao;

import java.util.ArrayList;
import java.util.List;

import com.dextra.model.Promocao;

/**
 * DAO Promoção
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
public class DaoPromocao {
	
	private List<Promocao> promocoes = new ArrayList<>(); 
			
	public DaoPromocao(){
		// Promoções pré-definidas (sem lanches adicionados)
		promocoes.add(new Promocao(1,"Light"));
		promocoes.add(new Promocao(2,"Muita carne"));
		promocoes.add(new Promocao(3,"Muito queijo"));
		promocoes.add(new Promocao(4,"Inflação"));
	}
	
	/**
	 * Método de retorno de todas as promoções
	 * @author Thiago Hernandes de Souza
	 * @since 17-07-2017
	 * */
	public List<Promocao> todas(){
		return promocoes;
	}

}
