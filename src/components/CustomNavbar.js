import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Image
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CustomNavbar.css";

class CustomNavbar extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand className="nav-header">
            <Link to="/">
              <Image src="/assets/image.png" className="nav-logo" />
              홈이다옹
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="menus">
            <NavItem eventKey={1} componentClass={Link} href="/user" to="/user">
              고양이 정보
            </NavItem>

            <NavDropdown eventKey={2} title="통계 보기" id="basic-nav-dropdown">
              <MenuItem
                eventKey={2.1}
                componentClass={Link}
                href="/statistics/user"
                to="/statistics/user"
              >
                유저 통계
              </MenuItem>
              <MenuItem
                eventKey={2.2}
                componentClass={Link}
                href="/statistics/place"
                to="/statistics/place"
              >
                지역 통계
              </MenuItem>
            </NavDropdown>

            <NavItem
              eventKey={3}
              componentClass={Link}
              href="/requests"
              to="/requests"
            >
              요청 관리
            </NavItem>

            <NavDropdown eventKey={4} title="집사 관리" id="basic-nav-dropdown">
              <MenuItem
                eventKey={4.1}
                componentClass={Link}
                href="/admin"
                to="/admin"
              >
                집사 관리하기(예정)
              </MenuItem>
              <MenuItem
                eventKey={4.2}
                componentClass={Link}
                href="/add_admin"
                to="/add_admin"
              >
                집사 추가하기
              </MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem
              eventKey={1}
              componentClass={Link}
              href="/logout"
              to="/logout"
            >
              로그아웃
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default CustomNavbar;
