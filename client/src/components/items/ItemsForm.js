import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  Form,
  Header,
  Icon,
  Input,
  TextArea,
  Container,
  Segment,
} from "semantic-ui-react";
import { toast } from "react-toastify";

const ItemsForm = () => {
  const getProfile = async () => {
    try {
      const res = await fetch("/api/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      setId(parseData[0].user_id);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const images = useRef();

  const categoriesNames = ["camera", "film", "lens", "accessories", "other"];
  const categoryOptions = categoriesNames.map((category) => ({
    key: category,
    text: category,
    value: category,
  }));

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("itemName", name);
    formData.append("userId", id);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("imageUrl", imageUrl);
    formData.append("price", price);

    for (let i = 0; i < images.current.files.length; i++) {
      formData.append("img", images.current.files[i]);
    }
    try {
      await fetch(`/api/items`, {
        method: "POST",
        body: formData,
      });
      toast.success("item added");
      setTimeout(() => {
        window.location = "/-dashboard";
      }, 4000);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <Header as="h2" attached="top" block>
        <Icon name="plus" />
        <Header.Content>add item</Header.Content>
      </Header>
      <Segment attached>
        <Container>
          <Form onSubmit={handleAdd}>
            <Form.Group widths="equal">
              <Form.Field
                required
                fluid={true}
                id="form-input-control-name"
                control={Input}
                label="name"
                placeholder="model"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Field
                required
                fluid={true}
                id="form-input-control-price"
                control={Input}
                label="price"
                placeholder="$$"
                type="number"
                min="0"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <Form.Field
                id="form-input-control-image-url"
                control={Input}
                label="image url"
                placeholder="https://example.com/image.png"
                type="url"
                name="imageUrl"
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Form.Dropdown
                fluid={true}
                selection
                value={category}
                placeholder="pick one"
                label="category"
                name="category"
                options={categoryOptions}
                onChange={(e, { value }) => setCategory(value)}
              />
            </Form.Group>
            <Form.Field
              required
              fluid="true"
              name="description"
              id="form-textarea-control-description"
              control={TextArea}
              label="description"
              maxLength="300"
              placeholder="// (max. 300) this camera was bought in 1979, repaired two times, perfect condition."
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* <Form.Field>
              <Button fluid={true} as="label" htmlFor="file" type="button">
                <Icon name="file image" />
                add
              </Button>
            </Form.Field> */}
            <input type="file" id="file" hidden multiple ref={images} />
            <Form.Button primary>Save</Form.Button>
          </Form>
        </Container>
      </Segment>
    </Fragment>
  );
};

export default ItemsForm;
