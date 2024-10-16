import Ctn, { Render } from 'creaton-js'
import Header from './components/Header'
import Menu from './components/Menu.htm'
import Content from './components/Content'
import Home from './components/Home.htm'
import About from './components/About.htm'
import Contacts from './components/Contacts.htm'

// add the Render method as a property of the window object
window._$CtnRender_ = Render

Ctn(Header, Menu, Content, Home, About, Contacts)