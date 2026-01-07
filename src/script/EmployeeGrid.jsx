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
import { RatingComponent } from "@syncfusion/ej2-react-inputs";
import { ChipListComponent } from "@syncfusion/ej2-react-buttons";

const filterSettings = { type: "Menu" };
const pageSettings = { pageSize: 20 };

export default function EmployeeGrid({
  data,
  currentRole,
  roleConfig,
  columns,
}) {
  const gridRef = useRef(null);

  const EmailTemplate = (props) => (
    <a href={`mailto:${props.email}`}>{props.email}</a>
  );

  const RatingTemplate = (props) => {
    const value = Number(props?.rating) || 0;
    return (
      <div
        style={{
          transform: "scale(0.5)",
          transformOrigin: "left center",
        }}
      >
        <RatingComponent value={value} readOnly={true} />
      </div>
    );
  };

  const ActiveTemplate = (props) => {
    const chipText = props?.active ? "Active" : "Inactive";
    const chipClass = props?.active ? "e-success" : "e-danger";

    return (
      <ChipListComponent
        cssClass={`${chipClass} chip-rounded`}
        chips={[{ text: chipText }]}
      />
    );
  };

  // Enhance the base column definitions with role-specific editing rules.
  const columnDefs = useMemo(() => {
    const baseColumns = Array.isArray(columns) ? columns : [];
    return baseColumns.map((col) => {
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
      if (currentRole === "Manager" && !["rating", "contact"].includes(col.field)) {
        return { ...col, allowEditing: false };
      }
      return col;
    });
  }, [columns, currentRole]);

  // Build toolbar permissions from the role map.
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

  // Toggle column visibility whenever the role changes.
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