import Ctn, { Render } from './libs/ctn.esm'
import Header from './components/Header'
import Router from './components/Router'
import Content from './components/Content'
import Home from './components/Home.htm'
import About from './components/About.htm'
import Contacts from './components/Contacts.htm'

// define a property on the "window" object for server rendering
window._$CtnRender_ = Render

Ctn(Header, Router, Content, Home, About, Contacts)