package com.dextra.dao;

import java.util.List;

import com.dextra.database.DatabaseInMemory;
import com.dextra.model.Promocao;

/**
 * DAO Promoção
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
public class DaoPromocao {
	
	private List<Promocao> promocoes = DatabaseInMemory.getDbpromocoes(); 
			
	public DaoPromocao(){
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
