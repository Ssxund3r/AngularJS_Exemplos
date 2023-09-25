package projeto.angular.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import projeto.angular.hibernate.HibernateUtil;

/*Implementacao dos metodos padroes da interface de acesso ao banco e operacoes 
 *@author Gabriel
 *@param <T>*/
@SuppressWarnings("unchecked")
@Transactional(noRollbackFor = Exception.class)
@Service
public abstract class DaoImplementacao<T> implements DaoInterface<T> {

	private Class<T> persistenceClass;

	private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

	public DaoImplementacao(Class<T> persistenceClass) {
		super();
		this.persistenceClass = persistenceClass;
	}

	@Override
	public void salvar(T objeto) throws Exception {
		sessionFactory.getCurrentSession().save(objeto);
		sessionFactory.getCurrentSession().flush();
	}

	@Override
	public void deletar(T objeto) throws Exception {
		sessionFactory.getCurrentSession().delete(objeto);
		sessionFactory.getCurrentSession().flush();
	}
	
	@Override
	public T loadObjeto(Long codigo) throws Exception { 
		return (T) sessionFactory.getCurrentSession().get(persistenceClass, codigo);
	}

	@Override
	public void atualizar(T objeto) throws Exception {
		sessionFactory.getCurrentSession().update(objeto);
		sessionFactory.getCurrentSession().flush();
	}

	@Override
	public void salvarOuAtualizar(T objeto) throws Exception {
		sessionFactory.getCurrentSession().saveOrUpdate(objeto);
		sessionFactory.getCurrentSession().flush();
	}

	@Override
	public T merge(T objeto) throws Exception {
		T t = (T) sessionFactory.getCurrentSession().merge(objeto);
		sessionFactory.getCurrentSession().flush();
		return t;

	}

	@Override
	public List<T> lista() throws Exception {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(persistenceClass);
		criteria.addOrder(org.hibernate.criterion.Order.asc("id"));
		return criteria.list();
	}
	
	
}