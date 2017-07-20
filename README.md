# dwlanches
Processo Seletivo Dextra
Thiago Hernandes de Souza
----------------------------------------------
Programa de montagem de lanches
-----------------------------------------

------------ Instruções ------------  

git clone https://github.com/thiagohernandes/dwlanches.git

OBS: dados em memória - banco de dados

Passos a seguir:

1 - Após clonar o projeto, importar para Eclipse como projeto do Maven;
2 - Configurar o JDK/JRE para Java 8;
3 - Realizar o download do Wildfly 10;
4 - No diretório raiz do projeto, fazer :
	4.1 - mvn clean compile
	4.2 - mvn clean package
5 - Copiar o artefato (dw-lanches.war) gerado no diretório "targed" para o
diretório "widlfly10/standalone/deployments"
6 - acessar o sistema em: http://localhost:8080/dw-lanches/


