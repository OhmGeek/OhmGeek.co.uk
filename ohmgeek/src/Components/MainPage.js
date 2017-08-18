import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Hero from 'grommet/components/Hero';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
export default class MainPage extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div>
        <Box>
          <Hero size="medium" backgroundImage="http://forum.us.herozerogame.com/public/style_images/herozero_master/custom/background.jpg" colorIndex="light-1">
            <Heading strong={true} tag="h1">
              Ryan Collins, Software Engineer
            </Heading>
          </Hero>
        </Box>
        <Section>
          <Heading strong={false} tag="h2">
              Connect with me on Social Media
          </Heading>
          <Card heading="GitHub"
                link={<Anchor href='https://Github.com/OhmGeek'
                              label='View Code' />}
                thumbnail="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png"
                description="Many of my programming projects are on GitHub. Why not take a look?"
          />
          <Card heading="LinkedIn"
                link={<Anchor href='https://www.linkedin.com/in/ryan-j-collins/'
                              label='Network with me' />}
                thumbnail="https://content.linkedin.com/content/dam/brand/site/img/policies/member-logo-examples.png"
                description="Many of my programming projects are on GitHub. Why not take a look?"
          />
        </Section>
      </div>
    );
  }

}
