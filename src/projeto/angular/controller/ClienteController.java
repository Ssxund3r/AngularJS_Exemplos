package projeto.angular.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import projeto.angular.dao.DaoImplementacao;
import projeto.angular.dao.DaoInterface;
import projeto.angular.model.Cliente;

@Controller
@RequestMapping(value = "/cliente")
public class ClienteController extends DaoImplementacao<Cliente> implements DaoInterface<Cliente> {

	public ClienteController(Class<Cliente> persistenceClass) {
		super(persistenceClass);
	}

	@RequestMapping(value="/listar", method=RequestMethod.GET, headers = "Accept=application/json") 
	@ResponseBody
	public String listar() {
		List<Cliente> clientes = new ArrayList<Cliente>();
		Cliente cliente = new Cliente();
		cliente.setId(1L);
		cliente.setEndereco("Rua Jorge Amado");
		cliente.setNome("Gabriel Costa");
		cliente.setTelefone("55+(51)98639-9909");
		
		cliente.setId(12L);
		cliente.setEndereco("Gravatai");
		cliente.setNome("Jhow");
		cliente.setTelefone("5551624");
		
		clientes.add(cliente);
		return new Gson().toJson(clientes);
	}

}
