import React from 'react';
import styled from 'styled-components';

//MUI
import { Link, Typography } from '@material-ui/core';

const Root = styled.div`
  display: flex;
  justify-content: space-between;

`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Footer = () => {
  return (
    <Root>
      <Left>
        <Typography>Made By <Link href="https://github.com/ahan8927">Aaron Hanson</Link></Typography>
        <Typography>Built with<Link href="https://tonejs.github.io/" >Tone.js</Link></Typography>
        <Typography>Project <Link href='https://github.com/ahan8927/Muse'>Repo</Link></Typography>
      </Left>
      <Right>
        <Typography>Inspired by <Link href='https://github.com/joebeachjoebeach/beat-bucket'>This guy</Link> and <Link href='http://sampulator.com/'>this guy</Link></Typography>
        <Typography><Link href="https://github.com/ahan8927">Github</Link> <Link href='https://www.linkedin.com/in/aaron-hanson-brb/'>LinkedIn</Link> <Link>Portfolio</Link></Typography>
      </Right>
    </Root>
  )
}

export default Footer
