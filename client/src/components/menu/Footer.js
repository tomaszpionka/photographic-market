import React, { Fragment } from "react";
import { Container, Grid, Header, List, Segment } from "semantic-ui-react";

const Footer = () => {
  return (
    <Fragment>
      <Segment
        inverted
        vertical
        style={{ padding: "5em 0em", margin: "32px 0 0 0" }}
      >
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="about" />
                <List link inverted>
                  {/* <List.Item as="a">sitemap</List.Item> */}
                  <List.Item
                    as="a"
                    target="_blank"
                    href="https://linkedin.com/in/tomaszpionka"
                  >
                    contact us
                  </List.Item>
                  <List.Item as="a">events</List.Item>
                  <List.Item
                    as="a"
                    target="_blank"
                    href="https://github.com/tomaszpionka"
                  >
                    partners
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="services" />
                <List link inverted>
                  <List.Item as="a">orders</List.Item>
                  <List.Item as="a">faq</List.Item>
                  <List.Item as="a">access</List.Item>
                  <List.Item as="a">subscribe</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4" inverted>
                  mission
                </Header>
                <p>
                  our goal is to provide people with space for exchanging
                  vintage stuff.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </Fragment>
  );
};

export default Footer;
