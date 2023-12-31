package projeto.angular.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Modelo que representa a tabela de Cliente para o banco de dados
 * 
 * @author Gabriel
 *
 */
@Entity
@Table(name = "TB_CLIENTE")
public class Cliente implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID_CLIENTE")
	private Long id;

	@Column(name = "NOME")
	private String nome;

	@Column(name = "ENDERECO")
	private String endereco;

	@Column(name = "TELEFONE")
	private String telefone;

	@Column(name = "SEXO")
	private String sexo;

	@Column(name = "ATIVO")
	private Boolean ativo;
	
	@Column(name="INTERESSE")
	private String interesse;
	
	public void setInteresse(String interesse) {
		this.interesse = interesse;
	}
	
	public String getInteresse() {
		return interesse;
	}
	
	public void setAtivo(Boolean ativo) {
		if (ativo == null)
			this.ativo = false;

		this.ativo = ativo;
	}

	public Boolean getAtivo() {
		return ativo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public String getSexo() {
		return sexo;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Cliente other = (Cliente) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
