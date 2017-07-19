package com.dextra.model;

import java.time.LocalDate;
import java.util.List;

import com.dextra.util.Util;

/**
 * Model Pedido
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
public class Pedido {
	
	private int id;
	private LocalDate data;
	private Cliente cliente;
	private List<Lanche> lanches;
	private double valorTotal;
	private String dataFormatada;
	
	private Util util = new Util();
	
	public Pedido(){
	}
	
	public Pedido(int id, LocalDate data, Cliente cliente, List<Lanche> lanches, double valorTotal){
		this.id = id;
		this.data = data;
		this.cliente = cliente;
		this.lanches = lanches;
		this.valorTotal = valorTotal;		
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public LocalDate getData() {
		return data;
	}
	public void setData(LocalDate data) {
		this.data = data;
	}
	public Cliente getCliente() {
		return cliente;
	}
	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	public List<Lanche> getLanches() {
		return lanches;
	}
	public void setLanches(List<Lanche> lanches) {
		this.lanches = lanches;
	}
	public double getValorTotal() {
		return valorTotal;
	}
	public void setValorTotal(double valorTotal) {
		this.valorTotal = valorTotal;
	}
	public String getDataFormatada() {
		dataFormatada = util.formataDataDMA(this.data);
		return dataFormatada;
	}
}
