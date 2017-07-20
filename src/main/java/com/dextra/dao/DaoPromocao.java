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
		promocoes.add(new Promocao(1,"Light - 10% desconto",10));
		promocoes.add(new Promocao(2,"Muita carne - 15% desconto",15));
		promocoes.add(new Promocao(3,"Muito queijo - 13% desconto",13));
		promocoes.add(new Promocao(4,"Inflação - 20% desconto",20));
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
