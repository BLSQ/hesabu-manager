import React, { useState } from "react";
import { Button, List } from "@material-ui/core";
import { FieldArray } from "formik";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { withTranslation } from "react-i18next";
import MenuItemsListItem from "../components/MenuItems/MenuItemsListItem";
import _isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { draggedItemStyle } from "../utils/formStyles";

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
  ...draggedItemStyle(isDragging),
});

function MenuItemsList(props) {
  const { t, values, submitForm } = props;
  const menuItemsAttributes = values.project.menuItemsAttributes;
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  return (
    <FieldArray
      name="project.menuItemsAttributes"
      render={arrayHelpers => (
        <div>
          <DragDropContext
            onDragEnd={result => {
              if (result.destination) {
                arrayHelpers.move(
                  result.source.index,
                  result.destination.index,
                );
                submitForm();
              }
            }}
          >
            <Droppable droppableId="droppable-hstg">
              {(provided, _snapshot) => (
                <List ref={provided.innerRef}>
                  {!_isEmpty(menuItemsAttributes) &&
                    values.project.menuItemsAttributes.map(
                      (menuItem, index) => (
                        <Draggable
                          index={index}
                          key={`menuItem-index-${index}`}
                          draggableId={`menuItem-index-${index}`}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                              )}
                            >
                              <MenuItemsListItem
                                {...menuItem}
                                handleEdit={() => setEditingMenuItem(menuItem)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ),
                    )}
                </List>
              )}
            </Droppable>
          </DragDropContext>
          <Button color="primary" onClick={() => setEditingMenuItem({})}>
            {t("buttons.addMenuItem")}
          </Button>
        </div>
      )}
    />
  );
}

export default withTranslation("translations")(connect()(MenuItemsList));
