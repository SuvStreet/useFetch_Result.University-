import { useFetch } from './hooks/useFetch'

import './App.css'

function Demo() {
  const { data, isLoading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/posts'
  )

  return (
    <div>
      <div>
        <button
          onClick={() =>
            refetch({
              params: {
                _limit: 3,
              },
            })
          }
        >
          Перезапросить
        </button>
      </div>
      {isLoading && <div className="loading">Загрузка...</div>}
      {error && <div className="error">'Произошла ошибка'</div>}
      {data &&
        !isLoading &&
        data.map((item) => <div className="card" key={item.id}>{item.title}</div>)}
    </div>
  )
}

export default Demo