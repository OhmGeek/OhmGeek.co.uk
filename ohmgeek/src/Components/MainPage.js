import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Hero from 'grommet/components/Hero';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Image from 'grommet/components/Image';
import Columns from 'grommet/components/Columns';

// Photos
import background from './../background.jpg';
import githubmark from './../GitHub-Mark.png';
import myself from './../Me.jpg';
import linkedin from './../LinkedIn-Mark.png';

export default class MainPage extends Component {
  constructor(props) {
    super();
    this.props = props;

  }

  render() {
    return (
      <div>
      <Hero background={<Image src={background}
            fit='cover'
            full={true} />}
            backgroundColorIndex='light'>
            <Box direction='row'
                 justify='center'
                 align='center'>
                 <Box basis='1/2'
                      align='end'
                      pad='medium'>
                      <Image src={myself}/>
                 </Box>
                 <Box basis='1/2'
                      align='start'
                      pad='medium'>
                      <Heading tag='h1' strong={true} margin='none' >
                        Ryan Collins - Software Engineer
                      </Heading>
                </Box>
            </Box>
        </Hero>
        <Section>
          <Heading strong={false} tag="h2">
              Connect with me on Social Media
          </Heading>
          <Columns>
            <Card heading="GitHub"
                  link={<Anchor href='https://Github.com/OhmGeek'
                                label='View Code' />}
                  thumbnail={githubmark}
                  description="Many of my programming projects are on GitHub. Why not take a look?"
            />
            <Card heading="LinkedIn"
                  link={<Anchor href='https://www.linkedin.com/in/ryan-j-collins/'
                                label='Network with me' />}
                  thumbnail={linkedin}
                description="Get it touch with me via LinkedIn, or connect with me."
                />
          </Columns>
        </Section>

      </div>
    );
  }

}
