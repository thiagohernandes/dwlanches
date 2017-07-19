package com.dextra.model;

import java.util.List;

/**
 * Model Lanche
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
public class Lanche {
	
	private int id;
	private String nome;
	private List<Ingrediente> ingredientes;
	private double valorTotal;
	
	public Lanche(){
		
	}
	public Lanche(int id, String nome){
		this.id = id;
		this.nome = nome;
	}	
	public Lanche(int id, String nome, double valorTotal){
		this.id = id;
		this.nome = nome;
		this.valorTotal = valorTotal;
	}
	public Lanche(int id, String nome, List<Ingrediente> ingredientes){
		this.id = id;
		this.nome = nome;
		this.ingredientes = ingredientes;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public List<Ingrediente> getIngredientes() {
		return ingredientes;
	}
	public void setIngredientes(List<Ingrediente> ingredientes) {
		this.ingredientes = ingredientes;
	}
	public double getValorTotal() {
		return valorTotal;
	}
	public void setValorTotal(double valorTotal) {
		this.valorTotal = valorTotal;
	}
	

}
