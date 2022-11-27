import './Nav.css'
export default function Nav() {
  return (
    <header>
      <nav>
        <div className="nav-brand">
          <img src={require('../../assets/cat.jpg')} alt="" srcset="" />
          <h4>
            salad.io
          </h4>
        </div>
      </nav>
    </header>
  )
}
