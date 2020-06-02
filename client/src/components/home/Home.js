import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="Imagine-a-Company"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em",
      }}
    />
    <Header
      as="h2"
      content="Do whatever you want when you want to."
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
      }}
    />
    <Button primary size="huge" as={Link} to="/-items">
      get started
      <Icon name="right arrow" />
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

// responsive container

const Home = () => {
  return (
    <Fragment>
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                find the treasures
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                add your items and start ordering
              </p>
              <Header as="h3" style={{ fontSize: "2em" }}>
                give items new life
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                exchange vintage stuff without paying
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image
                bordered
                rounded
                size="large"
                src="https://images.fineartamerica.com/images-medium-large-5/1-vintage-cameras-jorg-greuel.jpg"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button size="huge" as={Link} to="/-items">
                check it out
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: "0em" }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "what an app!"
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                that is what they say about us
              </p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "I saved a lot with this app!"
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                <Image
                  avatar
                  src="https://simhub.github.io/justFlipIt/img/jenny.jpg"
                />
                <b>Nan</b> amateur photographer
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: "8em 0em" }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: "2em" }}>
            film &#x26; digital
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            huge network and variety of unique items will suit your needs...
          </p>
          <Button as={Link} to="/-items" size="large">
            try it
          </Button>

          <Divider
            as="h4"
            className="header"
            horizontal
            style={{ margin: "3em 0em", textTransform: "uppercase" }}
          >
            <a href="/">important</a>
          </Divider>

          <Header as="h3" style={{ fontSize: "2em" }}>
            authors
          </Header>
          <p style={{ fontSize: "1.33em" }}>check out our projects</p>
          <Button
            size="large"
            as="a"
            href="https://github.com/tomaszpionka"
            target="_blank"
          >
            visit
          </Button>
        </Container>
      </Segment>
    </Fragment>
  );
};

export default Home;
