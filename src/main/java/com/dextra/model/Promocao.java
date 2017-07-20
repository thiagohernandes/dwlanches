package com.dextra.model;

/**
 * Model Promoção
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
public class Promocao {
	
	private int id;
	private String descricao;
	private int desconto;

	public Promocao(int id , String descricao, int desconto){
		this.id = id;
		this.descricao = descricao;
		this.desconto = desconto;
	}
	
	public Promocao(int id , String descricao, Lanche lanche){
		this.id = id;
		this.descricao = descricao;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public int getDesconto() {
		return desconto;
	}

	public void setDesconto(int desconto) {
		this.desconto = desconto;
	}
}
