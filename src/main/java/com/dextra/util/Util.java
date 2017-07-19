package com.dextra.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * Classe contendo funções auxiliares genéricas
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
public class Util {
	
	/** 
	 * Função para retornar os valores de um objeto
	 * @author Thiago Hernandes de Souza
	 * @since 17-07-2017
	 * @param objeto
	 * @return valores em formato de array
	 * */	
	public String[] formataValoresObjeto(Object o){
		
		String[] v = o.toString().split(",");		
		int tamanhoObj = v.length;		
		int posFind = 0;
		
		for(int posAtr = 0; posAtr < tamanhoObj; posAtr++) {
			for(int pos = 0; pos < v[posAtr].length(); pos++){
				if(v[posAtr].trim().charAt(pos) == '='){
					posFind = pos+1;
					v[posAtr] = v[posAtr].substring(posFind).replace("=", "")
															.replace("}", "")
															.replace("{", "")
															.replace(" ", "")
															.replace("id","")
															.replace("[","")
															.replace("]","");
					break;
				}
			}			
		}
		return v;
	}
	
	/**
	 * Formata string em data 
	 * @author Thiago Hernandes de Souza
	 * @since 18-07-2017
	 * @param LocalDate
	 * @return data formatada
	 * */
	public LocalDate formataStringToDate(String data){
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		LocalDate dataFormatada = LocalDate.parse(data,formatter);
		 return dataFormatada;
	}	

}
