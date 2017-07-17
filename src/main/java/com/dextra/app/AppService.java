package com.dextra.app;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import com.dextra.services.IngredienteService;
import com.dextra.services.LancheService;
import com.dextra.services.PromocaoService;

/**
 * APP-API
 * Classe principal dos serviços REST
 * @author Thiago Hernandes de Souza
 * @since 17-07-2017
 * */
@ApplicationPath("/rest")
public class AppService extends Application{
	private Set<Object> singletons = new HashSet<Object>();

	/**
	 * Método de inclusão de resources
	 * @author Thiago Hernandes de Souza
	 * @since 17-07-2017
	 * */
	public AppService() {
		singletons.add(new PromocaoService());
		singletons.add(new IngredienteService());
		singletons.add(new LancheService());
	}

	@Override
	public Set<Object> getSingletons() {
		return singletons;
	}

}