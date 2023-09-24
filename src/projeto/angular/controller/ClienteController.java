package projeto.angular.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@RequestMapping(value="salvar", method=RequestMethod.POST)
	@ResponseBody
	public ResponseEntity salvar(@RequestBody String jsonCliente) throws Exception {
		Cliente cliente = new Gson().fromJson(jsonCliente, Cliente.class);
		super.salvarOuAtualizar(cliente);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/listar", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String listar() throws Exception {
		return new Gson().toJson(super.lista());
	}

	@RequestMapping(value="deletar/{codCliente}", method=RequestMethod.DELETE)
	public  @ResponseBody String deletar (@PathVariable("codCliente") String codCliente) throws Exception {
		super.deletar(loadObjeto(Long.parseLong(codCliente)));
		return "";
	}

}