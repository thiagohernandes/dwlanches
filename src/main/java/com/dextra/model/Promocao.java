package com.dextra.model;

/**
 * Model Promoção
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
public class Promocao {
	
	private int id;
	private String descricao;
	private Lanche lanche;

	public Promocao(int id , String descricao){
		this.id = id;
		this.descricao = descricao;
	}
	
	public Promocao(int id , String descricao, Lanche lanche){
		this.id = id;
		this.descricao = descricao;
		this.lanche = lanche;
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
	public Lanche getLanche() {
		return lanche;
	}
	public void setLanche(Lanche lanche) {
		this.lanche = lanche;
	}
}
