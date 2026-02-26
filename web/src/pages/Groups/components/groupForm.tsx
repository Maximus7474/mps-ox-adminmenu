import { Input } from "../../../components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../../components/ui/field";
import { Button } from "../../../components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../../components/ui/select";
import { FormEvent, useCallback, useState } from "react";
import { Checkbox } from "../../../components/ui/checkbox";
import { LucidePlusCircle, LucideTrash2 } from "lucide-react";
import { Separator } from "../../../components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";
import { GroupDataDto } from "../types/groupDataDto";
import { ButtonGroup } from "../../../components/ui/button-group";
import { useNavigate } from "react-router-dom";

/* @ToDo: improve styling, entire element overflows messing with page style */

const defaultForm = { name: '', label: '', grades: [{ id: 1, label: '', role: null}]};

interface GroupFormProps {
  title: string;
  submit: (group: GroupDataDto) => void;
  group?: GroupDataDto;
  submitError: string | null;
}

const GroupForm: React.FC<GroupFormProps> = ({ title, group = defaultForm, submit, submitError }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<GroupDataDto>(group);

  const handleAddGrade = useCallback(() => {
    const maxId = formData.grades.reduce((max, grade) => Math.max(max, grade.id), 0);
    const newGradeId = maxId + 1;
    
    setFormData((prev) => ({
      ...prev,
      grades: [
      ...prev.grades,
      { id: newGradeId, label: '', role: null },
    ]
    }));
  }, [formData.grades]);

  const handleRemoveGrade = useCallback((id: number) => {
    if (formData.grades.length > 1) {
      setFormData((prev) => {
        const filteredList = prev.grades.filter((grade) => grade.id !== id);
        
        const reindexedList = filteredList.map((grade, index) => ({
          ...grade,
          id: index + 1,
        }));
        
        return {...prev, grades: reindexedList};
      });
    }
  }, [formData.grades.length]);

  const handleGradeChange = useCallback((id: number, field: 'label' | 'role', value: string) => {
    setFormData((prev) => ({
      ...prev,
      grades: prev.grades.map((grade) =>
        grade.id === id ? { ...grade, [field]: field === 'role' && value === 'none' ? null : value } : grade
      )
    }));
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Parsed Group Data for Submission:", formData);

    submit(formData);
  }

  return <div className="p-4 h-full flex flex-col">
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl">{title}</h1>

        <ButtonGroup>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
          <Button variant="destructive" type="button" onClick={() => navigate(group.name ? `/groups/view/${group.name}/` : '/groups/view/')}>
            Cancel
          </Button>
        </ButtonGroup>
      </div>
      
      {submitError && (
        <div className="mt-3"> {/* Added margin-top for spacing */}
          <Alert variant="destructive">
            <AlertTitle>
              Unable to save
            </AlertTitle>
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>

    <Separator className="my-2" />

    <form className="flex-grow min-h-0 pr-2"> 
      <FieldSet className="h-full">
        <div className="grid grid-cols-2 gap-4 h-[500px]">
          <FieldGroup>
            <h2 className="text-lg">General Details</h2>

            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input
                id="name"
                placeholder="group identifier"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({...prev, name: e.target.value}))}
              />
            </Field>
            <Field>
              <FieldLabel>Label</FieldLabel>
              <Input
                id="label"
                placeholder="A nice Label"
                required
                value={formData.label}
                onChange={(e) => setFormData((prev) => ({...prev, label: e.target.value}))}
              />
            </Field>
            <Field>
              <FieldLabel>Type:</FieldLabel>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData((prev) => ({...prev, type: value}))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job">Job</SelectItem>
                  <SelectItem value="gang">Gang</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="has-account"
                checked={formData.hasAccount ?? false}
                onCheckedChange={(state) => setFormData((prev) => ({...prev, hasAccount: !!state }))}
              />
              <FieldLabel>Has account</FieldLabel>
            </Field>
          </FieldGroup>

          <FieldGroup className="flex flex-col min-h-0">
            <div className="flex flex-row justify-between items-center mb-4 shrink-0">
              <h2 className="text-lg">Grades</h2>
              <Button type="button" variant="outline" onClick={handleAddGrade}>
                <LucidePlusCircle className="w-4 h-4 mr-2" />
                Add New Rank
              </Button>
            </div>

            <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar">
              {formData.grades.map((grade, index) => (
                <div key={grade.id} className="p-4 border border-200 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-lg">Rank {grade.id}</h4>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => handleRemoveGrade(grade.id)}
                        aria-label={`Remove Rank ${grade.id}`}
                        disabled={formData.grades.length < 1}
                      >
                        <LucideTrash2 className="w-4 h-4" />
                      </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>Label</FieldLabel>
                      <Input
                        name={`grade-${grade.id}-label`}
                        required
                        value={grade.label}
                        onChange={(e) => handleGradeChange(grade.id, 'label', e.target.value)}
                        placeholder={`e.g., Member, Boss, Grade ${index + 1}`}
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Account Role</FieldLabel>
                      <Select
                        defaultValue={grade.role ?? 'none'}
                        onValueChange={(e) => handleGradeChange(grade.id, 'role', e)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="contributor">Contributor</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="owner">Owner</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </div>
              ))}
            </div>
          </FieldGroup>
        </div>
      </FieldSet>
    </form>
  </div>;
}

export default GroupForm;
