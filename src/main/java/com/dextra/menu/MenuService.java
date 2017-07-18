package com.dextra.menu;

import java.io.IOException;
import java.io.InputStream;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

/**
 * Serviço de Carregamento Dinâmico do Menu
 * @author Thiago Hernandes de Souza
 * @since 18-07-2017
 * */

@Path("/menu")
public class MenuService {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Menus obterOpcoesMenu() throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		InputStream menuStream = Thread.currentThread().getContextClassLoader().getResourceAsStream("/menu.json");
		Menus menus = objectMapper.readValue(menuStream, Menus.class);		
		return menus;
	}

}
