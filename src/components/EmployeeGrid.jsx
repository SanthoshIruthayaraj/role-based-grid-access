import React, { useMemo, useRef, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Sort,
  Filter,
  Edit,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
  import {
  RatingComponent,
  MaskedTextBoxComponent,
} from "@syncfusion/ej2-react-inputs";
import { ChipListComponent } from "@syncfusion/ej2-react-buttons";
import '../styles/EmployeeGrid.css';

const CONTACT_MASK = "(000) 000-0000";

export default function EmployeeGrid({
  data,
  currentRole,
  roleConfig,
  columns,
}) {
  const gridRef = useRef(null);

  const filterSettings = { type: "Menu" };
  const pageSettings = { pageSize: 20 };

  const EmailTemplate = (props) => (
    <div className="cell-template email-template">
      <a href={`mailto:${props.email}`}>{props.email}</a>
    </div>
  );

  const RatingTemplate = (props) => {
    const value = Number(props?.rating) || 0;
    return (
      <div className="cell-template rating-template">
        <div
          style={{
            transform: "scale(0.5)",
            transformOrigin: "left center",
          }}
        >
          <RatingComponent value={value} readOnly={true} />
        </div>
      </div>
    );
  };

  const ActiveTemplate = (props) => {
    const chipText = props?.active ? "Active" : "Inactive";
    const chipClass = props?.active ? "e-success" : "e-danger";

    return (
      <div className="cell-template status-template">
        <div className="grid-chip-center">
          <ChipListComponent
            cssClass={`${chipClass} chip-rounded`}
            chips={[{ text: chipText }]}
          />
        </div>
      </div>
    );
  };

  const ContactEditTemplate = (props) => {
    const value = props?.rowData?.contact ?? props?.contact ?? "";
    const handleChange = (args) => {
      const nextValue = args?.value ?? "";
      if (props?.rowData) {
        props.rowData.contact = nextValue;
      } else if (props) {
        props.contact = nextValue;
      }
    };

    return (
      <div className="cell-template contact-edit-template">
        <MaskedTextBoxComponent
          mask={CONTACT_MASK}
          value={value}
          placeholder="(555) 123-4567"
          width="100%"
          change={handleChange}
        />
      </div>
    );
  };

  const columnDefs = useMemo(() => {
    const baseCols = Array.isArray(columns) ? columns : [];
    return baseCols.map((col) => {
      if (col.field === "email") {
        return { ...col, template: EmailTemplate };
      }
      if (col.field === "rating") {
        return {
          ...col,
          template: RatingTemplate,
          edit: {
            params: {
              min: 0,
              max: 5,
              decimals: 0,
              format: "n0",
            },
          },
        };
      }
      if (col.field === "salary") {
        return {
          ...col,
          edit: {
            params: {
              showSpinButton: false,
              decimals: 0,
              format: "n0",
            },
          },
        };
      }
      if (col.field === "active") {
        return {
          ...col,
          template: ActiveTemplate,
        };
      }
      if (col.field === "contact") {
        return {
          ...col,
          editTemplate: ContactEditTemplate,
        };
      }
      if (
        currentRole === "Manager" &&
        !["rating", "contact"].includes(col.field)
      ) {
        return { ...col, allowEditing: false };
      }
      return col;
    });
  }, [columns, currentRole]);

  const toolbarItems = useMemo(() => {
    const config = roleConfig[currentRole] ?? roleConfig.Employee;
    const items = [];
    if (config.canAdd) items.push("Add");
    if (config.canEdit) items.push("Edit");
    if (config.canDelete) items.push("Delete");
    if (config.canAdd || config.canEdit || config.canDelete) {
      items.push("Update", "Cancel");
    }
    items.push("Search");
    return items;
  }, [currentRole, roleConfig]);

  const gridEditSettings = useMemo(() => {
    const config = roleConfig[currentRole] ?? roleConfig.Employee;
    return {
      allowEditing: config.canEdit,
      allowAdding: config.canAdd,
      allowDeleting: config.canDelete,
      mode: "Normal",
    };
  }, [currentRole, roleConfig]);

  useEffect(() => {
    const gridInstance = gridRef.current;
    if (!gridInstance) return;

    const visibleFields = roleConfig[currentRole]?.visible ?? [];
    columnDefs.forEach((column) => {
      const columnModel = gridInstance.getColumnByField(column.field);
      if (!columnModel) return;
      columnModel.visible = visibleFields.includes(column.field);
    });

    gridInstance.refreshColumns();
  }, [currentRole, columnDefs, roleConfig]);

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="grid-container">
          <GridComponent
            height="100%"
            ref={gridRef}
            dataSource={data}
            allowPaging
            allowSorting
            allowFiltering
            toolbar={toolbarItems}
            editSettings={gridEditSettings}
            filterSettings={filterSettings}
            pageSettings={pageSettings}
            clipMode={'EllipsisWithTooltip'}
          >
            <ColumnsDirective>
              {columnDefs.map((column) => (
                <ColumnDirective key={column.field} {...column} />
              ))}
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Edit, Toolbar]} />
          </GridComponent>
        </div>
      </div>
    </section>
  );
}